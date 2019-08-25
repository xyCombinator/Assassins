package de.martin.craftnoteassassins.controller

import de.martin.craftnoteassassins.dtos.CircleDTO
import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.services.CircleService
import de.martin.craftnoteassassins.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
class CircleControler @Autowired constructor(val circleService: CircleService, val userService: UserService){

    @PostMapping("/circles/{circleId}/join")
    fun join (@PathVariable("circleId") circle: String, user: Principal): String {
        val foundCircle = circleService.findCircle(circle)
        if(foundCircle === null){
            return "circleNotFound"
        }
        val findCirclesOfUser = circleService.findCirclesOfUser(user.name).map { it.name }
        if(findCirclesOfUser.contains(circle)){
            return "name already belongs to circle"
        }

        userService.joinCircle(user.name, circle)
        return "successfully joined circle"
    }

    @PostMapping("/circles/{circleId}")
    fun createCircle (@PathVariable("circleId") circle: String, user: Principal): String {
        val foundCircle = circleService.findCircle(circle)
        if(foundCircle !== null){
            return "circle already exists"
        }
        circleService.createCircle(circle, user.name)
        return "circle created"
    }

    @PostMapping("/circles/{circleId}/activate")
    fun activateCircle (@PathVariable("circleId") circle: String, user: Principal): String {
        val foundCircle = circleService.findCircle(circle) ?: return "circle does not exist"
        if(foundCircle.owner.username != user.name){
            return "this is not your circle"
        }
        circleService.activateCircle(circle)
        return "circle activated"
    }

    @GetMapping("/circles")
    fun listAllCircles (): List<CircleDTO> {
        return circleService.findAllCircles()
    }




}