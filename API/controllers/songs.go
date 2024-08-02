package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"tabbus.app/tabbus-api/models"
)

type SongInput struct {
	Name          string
	Sequence      []int
	SequenceNotes []string
	Notes         string
}

// GET /songs
func FindSongs(c *gin.Context) {
	var songs []models.Song
	// models.DB.Find(&songs)
	models.DB.Preload("Riffs").Find(&songs)

	c.JSON(http.StatusOK, gin.H{"data": songs})
}

// GET /songs/:id
func FindSong(c *gin.Context) {
	var song models.Song

	if err := models.DB.Preload("Riffs").Where("id = ?", c.Param("id")).First(&song).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": song})
}

// POST /songs
func CreateSong(c *gin.Context) {
	var input SongInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var uintSeq []uint
	for _, n := range input.Sequence {
		uintSeq = append(uintSeq, uint(n))
	}

	song := models.Song{Name: input.Name, Notes: input.Notes, SequenceNotes: input.SequenceNotes, Sequence: uintSeq}
	models.DB.Create(&song)

	c.JSON(http.StatusOK, gin.H{"data": song})
}

// POST /songs/:id
func UpdateSong(c *gin.Context) {
	// Get model if exist
	var song models.Song
	if err := models.DB.Where("id = ?", c.Param("id")).First(&song).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input SongInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Model(&song).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": song})
}
