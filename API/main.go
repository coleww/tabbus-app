package main

import (
	"github.com/gin-gonic/gin"
	"tabbus.app/tabbus-api/controllers"
	"tabbus.app/tabbus-api/models"
)

func main() {
	r := gin.Default()

	models.DatabaseConnection()

	r.GET("/songs", controllers.FindSongs)

	r.Run()
}
