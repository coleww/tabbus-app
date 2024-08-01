package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"tabbus.app/tabbus-api/models"
)

// GET /songs
func FindSongs(c *gin.Context) {
	var songs []models.Song
	// models.DB.Find(&songs)
	models.DB.Preload("Riffs").Find(&songs)

	c.JSON(http.StatusOK, gin.H{"data": songs})
}

// // GET /songs/:id
// func FindSong(c *gin.Context) { // Get model if exist
// 	var song models.Song
// 	var riffs []models.Song

// 	if err := models.DB.Where("id = ?", c.Param("id")).First(&song).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
// 		return
// 	}

// 	// JOINS
// 	// get riffs for song
// 	models.DB.Where("song_id = ?", c.Param("id")).Find(&riffs)

// 	c.JSON(http.StatusOK, gin.H{"data": song})
// }

// models.DB.Table("songs").Select("songs.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&songResult)

// models.DB.Model(&Song{}).Select("songs.name, riffs.name").Joins("left join riffs on riffs.song_id = songs.id").Scan(&result{})
// // SELECT users.name, emails.email FROM `users` left join emails on emails.user_id = users.id
