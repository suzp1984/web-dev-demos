package main

import (
	"log"
	"os"
	"net/http"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	http.Handle("/", http.FileServer(http.Dir("./")))
	log.Println("Server started: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":" + port, nil))
}
