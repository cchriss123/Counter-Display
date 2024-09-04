package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io"
	"net"
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

	go a.startTCPServer()
}

func (a *App) startTCPServer() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		fmt.Println("Error starting TCP server:", err)
		return
	}
	defer func(listener net.Listener) {
		err := listener.Close()
		if err != nil {
			fmt.Println("Error closing listener:", err)
		}
	}(listener)

	fmt.Println("TCP server started on port 8080")

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting connection:", err)
			continue
		}

		go a.handleConnection(conn)
	}
}

func (a *App) handleConnection(conn net.Conn) {
	defer func(conn net.Conn) {
		err := conn.Close()
		if err != nil {
			fmt.Println("Error closing connection:", err)
		}
	}(conn)

	body, err := io.ReadAll(conn)
	if err != nil {
		fmt.Println("Unable to read body:", err)
		return
	}

	message := string(body)
	fmt.Println("Received message:", message)

	runtime.EventsEmit(a.ctx, "dataFromBackend", message)

	response := map[string]string{"status": "success"}
	responseData, err := json.Marshal(response)
	if err != nil {
		fmt.Println("Error encoding response:", err)
		return
	}

	_, err = conn.Write(responseData)
	if err != nil {
		fmt.Println("Error writing to connection:", err)
		return
	}
}
