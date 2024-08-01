package models

import (
	"gorm.io/gorm"
)

type Song struct {
	gorm.Model
	Name          string
	Sequence      []uint   `gorm:"serializer:json"`
	SequenceNotes []string `gorm:"serializer:json"`
	Notes         string
	Riffs         []Riff
}
