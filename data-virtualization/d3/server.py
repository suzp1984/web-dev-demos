import SimpleHTTPServer
import SocketServer
import os

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 8000))
    handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    httpd = SocketServer.TCPServer(("", PORT), handler)

    print("python simple http server started at port ", PORT)
    httpd.serve_forever()
    
    
