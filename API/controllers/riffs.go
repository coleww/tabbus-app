package controllers

import (
	"net/http"

	"tabbus.app/tabbus-api/models"

	"github.com/gin-gonic/gin"
)

// GET /riffs
func FindRiffs(c *gin.Context) {
	var riffs []models.Riff
	models.DB.Find(&riffs)

	c.JSON(http.StatusOK, gin.H{"data": riffs})
}
