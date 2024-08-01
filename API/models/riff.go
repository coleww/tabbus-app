package models

import "gorm.io/gorm"

type Riff struct {
	gorm.Model
	Name        string
	SelectedKey string
	Tuning      []string   `gorm:"serializer:json"`
	Data        [][]string `gorm:"serializer:json"`
	SongID      uint       `gorm:"foreignKey"`
}
