package de.martin.craftnoteassassins.controller

import de.martin.craftnoteassassins.dtos.CircleDTO
import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.services.CircleService
import de.martin.craftnoteassassins.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
class CircleControler @Autowired constructor(val circleService: CircleService, val userService: UserService){

    @PostMapping("/circles/{circleId}/join")
    fun join (@PathVariable("circleId") circle: String, user: Principal): Any {
        val foundCircle = circleService.findCircle(circle)
        if(foundCircle === null){
            return ResponseEntity<Any>(HttpStatus.NOT_FOUND)

        }
        val findCirclesOfUser = circleService.findCirclesOfUser(user.name).map { it.name }
        if(findCirclesOfUser.contains(circle)){
            return ResponseEntity<Any>(HttpStatus.BAD_REQUEST)
        }

        userService.joinCircle(user.name, circle)
        return ResponseEntity<Any>(HttpStatus.OK)
    }

    @PostMapping("/circles/{circleId}")
    fun createCircle (@PathVariable("circleId") circle: String, user: Principal): Any {
        val foundCircle = circleService.findCircle(circle)
        if(foundCircle !== null){
            return ResponseEntity<Any>(HttpStatus.BAD_REQUEST)
        }
        circleService.createCircle(circle, user.name)
        return ResponseEntity<Any>(HttpStatus.OK)
    }

    @PostMapping("/circles/{circleId}/activate")
    fun activateCircle (@PathVariable("circleId") circle: String, user: Principal): Any {
        val foundCircle = circleService.findCircle(circle) ?: return ResponseEntity<Any>(HttpStatus.NOT_FOUND)
        if(foundCircle.owner.username != user.name){
            return ResponseEntity<Any>(HttpStatus.BAD_REQUEST)
        }
        circleService.activateCircle(circle)
        return ResponseEntity.ok(CircleDTO(circle, UserDTO(user.name, null)))
    }

    @GetMapping("/circles")
    fun listAllCircles (): List<CircleDTO> {
        return circleService.findAllCircles()
    }




}