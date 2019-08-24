package de.martin.craftnoteassassins.services

interface RoundService{
    fun isUserHasWonRound(userName : String, circleName: String, roundNumber : Int) : Boolean
}