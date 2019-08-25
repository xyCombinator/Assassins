package de.martin.craftnoteassassins

import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.entities.Circle
import de.martin.craftnoteassassins.entities.User
import de.martin.craftnoteassassins.repositories.CircleRepository
import de.martin.craftnoteassassins.repositories.UserRepository
import de.martin.craftnoteassassins.repositories.UserRoundRepository
import de.martin.craftnoteassassins.services.CircleService
import de.martin.craftnoteassassins.services.RoundService
import de.martin.craftnoteassassins.services.UserService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class UserPersistenceTest {
    companion object {
        val CIRCLE_NAME = "Cool guys"
    }

    @Autowired
    lateinit var userRepo: UserRepository

    @Autowired
    lateinit var circleRepo: CircleRepository

    @Autowired
    lateinit var userRoundRepository: UserRoundRepository

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var circleService: CircleService

    @Autowired
    lateinit var roundService: RoundService


    val users = mutableListOf<User>()

    @BeforeEach
    fun setup() {
        userRoundRepository.findAll()
        val mart = User("smarten", "geheim")
        val ulla = User("ulla", "geheim")
        val edu = User("edu", "geheim")

        users.addAll(listOf(mart, ulla, edu))
        userRepo.save(mart)
        userRepo.save(ulla)
        userRepo.save(edu)

        val circle = Circle(CIRCLE_NAME, ulla)

        circleRepo.save(circle)

        userService.joinCircle(mart.username, circle.name)
        userService.joinCircle(edu.username, circle.name)
        userService.joinCircle(ulla.username, circle.name)
        circleService.activateCircle(CIRCLE_NAME)
    }

    @Test
    fun testStuff() {
        val users = circleService.findUsersOfCircle(CIRCLE_NAME)
        Assertions.assertEquals(3, users.size)
        val victim1 = userService.findNextVictim(users[0].name, CIRCLE_NAME)
        val victim2 = userService.findNextVictim(users[1].name, CIRCLE_NAME)
        val victim3 = userService.findNextVictim(users[2].name, CIRCLE_NAME)
        if (victim1 != null && victim2 != null && victim3 != null) {
            Assertions.assertNotEquals(victim1.name, victim2.name)
            Assertions.assertNotEquals(victim2.name, victim3.name)
            Assertions.assertNotEquals(victim3.name, victim1.name)
        } else {
            Assertions.fail("something is null")
        }

    }

    @Test
    fun testAssassination() {
        val users = circleService.findUsersOfCircle(CIRCLE_NAME)
        Assertions.assertEquals(3, users.size)
        val victim1 = userService.findNextVictim(users[0].name, CIRCLE_NAME)
        val victim2 = userService.findNextVictim(users[1].name, CIRCLE_NAME)
        val victim3 = userService.findNextVictim(users[2].name, CIRCLE_NAME)
        if (victim1 != null && victim2 != null && victim3 != null) {
            Assertions.assertNotEquals(victim1.name, victim2.name)
            Assertions.assertNotEquals(victim2.name, victim3.name)
            Assertions.assertNotEquals(victim3.name, victim1.name)
        } else {
            Assertions.fail<Unit>("something is null")
            return
        }
        val victimOfUser0Victim = userService.findNextVictim(victim1.name, CIRCLE_NAME)
        userService.killVictim(users[0].name, "cool guys")
        val newVictimOfUser0 = userService.findNextVictim(users[0].name, CIRCLE_NAME)

        if (victimOfUser0Victim == null || newVictimOfUser0 == null) {
            Assertions.fail<Unit>("something is null")
            return
        }
        Assertions.assertEquals(newVictimOfUser0.name, victimOfUser0Victim.name)
        val victimOfNewUser0Victim = userService.findNextVictim(newVictimOfUser0.name, CIRCLE_NAME);
        if (victimOfNewUser0Victim == null) {
            Assertions.fail<Unit>("something is null")
            return
        }
        Assertions.assertEquals(victimOfNewUser0Victim.name, users[0].name)
    }

    @Test
    fun testAssassinationRestartRound() {
        val mart = users[0]
        userService.killVictim(mart.username, CIRCLE_NAME)
        userService.killVictim(mart.username, CIRCLE_NAME)
        circleService.activateCircle(CIRCLE_NAME)
    }

    @Test
    fun testUserWinningCircle() {
        val mart = users[0]
        val ulla = users[1]
        val edu = users[2]

        userService.killVictim(mart.username, CIRCLE_NAME)
        userService.killVictim(mart.username, CIRCLE_NAME)

        var martHasWonRound = roundService.isUserHasWonRound(mart.username, CIRCLE_NAME, 1)
        var ullaHasWonRound = roundService.isUserHasWonRound(ulla.username, CIRCLE_NAME, 1)
        var eduHasWonRound = roundService.isUserHasWonRound(edu.username, CIRCLE_NAME, 1)

        Assertions.assertTrue(martHasWonRound)
        Assertions.assertFalse(ullaHasWonRound)
        Assertions.assertFalse(eduHasWonRound)

        circleService.activateCircle(CIRCLE_NAME)
        userService.killVictim(ulla.username, CIRCLE_NAME)
        userService.killVictim(ulla.username, CIRCLE_NAME)
        martHasWonRound = roundService.isUserHasWonRound(mart.username, CIRCLE_NAME, 2)
        ullaHasWonRound = roundService.isUserHasWonRound(ulla.username, CIRCLE_NAME, 2)
        eduHasWonRound = roundService.isUserHasWonRound(edu.username, CIRCLE_NAME, 2)
        Assertions.assertTrue(ullaHasWonRound)
        Assertions.assertFalse(martHasWonRound)
        Assertions.assertFalse(eduHasWonRound)

    }

    @Test
    fun testActivatingActiveCircle() {
        Assertions.assertThrows(RuntimeException::class.java) { circleService.activateCircle(CIRCLE_NAME) }
    }

    @Test
    fun testUserRegistration() {
        val user = UserDTO("test", "something")
        Assertions.assertThrows(RuntimeException::class.java) { userService.registerUser(user) }
    }

    @Test
    fun testUserInformation() {
        userService.getUserInformation(users[0].username)
    }

}