package controllers

import (
	"net/http"

	"tabbus.app/tabbus-api/models"

	"github.com/gin-gonic/gin"
)

type RiffInput struct {
	SongID      int
	Name        string
	SelectedKey string
	Tuning      string
	Data        string
}

// POST /riffs
func CreateRiff(c *gin.Context) {
	var input RiffInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	riff := models.DB.Model(&models.Riff{}).Create(input)

	c.JSON(http.StatusOK, gin.H{"data": riff})
}

// POST /riffs/:id
func UpdateRiff(c *gin.Context) {
	// Get model if exist
	var riff models.Riff
	if err := models.DB.Where("id = ?", c.Param("id")).First(&riff).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input RiffInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Model(&riff).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": riff})
}
