package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title    string
	Desc     string
	Address  string
	Date     string
	Strength uint
	OrgRefer uint
	//Users    []UserEvent `gorm:"many2many:user_events;"`
}
