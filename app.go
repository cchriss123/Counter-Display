package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io"
	"net/http"
)

type App struct {
	ctx          context.Context
	isFullscreen bool
}

func NewApp() *App {
	return &App{}
}

func (a *App) ToggleFullScreen() {
	if a.isFullscreen {
		runtime.WindowUnfullscreen(a.ctx)
	} else {
		runtime.WindowFullscreen(a.ctx)
	}
	a.isFullscreen = !a.isFullscreen
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	runtime.EventsOn(a.ctx, "toggle-fullscreen", func(...interface{}) {
		a.ToggleFullScreen()
	})

	go a.startHTTPServer()
}

func (a *App) startHTTPServer() {
	http.HandleFunc("/api/counter", func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			return
		}

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Unable to read body", http.StatusBadRequest)
			return
		}

		if err := r.Body.Close(); err != nil {
			fmt.Println("Error closing request body:", err)
		}

		runtime.EventsEmit(a.ctx, "dataFromBackend", string(body))

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		response := map[string]string{"status": "success"}
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			return
		}
	})

	fmt.Println("Starting server at port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
