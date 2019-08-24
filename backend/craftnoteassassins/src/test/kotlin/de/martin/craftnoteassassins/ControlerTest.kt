package de.martin.craftnoteassassins

import com.google.gson.Gson
import de.martin.craftnoteassassins.dtos.UserDTO
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import sun.plugin2.util.PojoUtil.toJson
import sun.plugin2.util.PojoUtil.toJson





@ExtendWith(SpringExtension::class)
@SpringBootTest
@AutoConfigureMockMvc
//@WithMockUser(username = "admin", password = "secret")
public class ApplicationTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @Test
    fun testRegister(){
        val gson = Gson()
        val user = gson.toJson(UserDTO("a", "b"))

        this.mockMvc.perform(MockMvcRequestBuilders.post("/register").content(user).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk)
    }

    @Test
    fun testHello(){
        val gson = Gson()
        val user = gson.toJson(UserDTO("a", "b"))

        this.mockMvc.perform(MockMvcRequestBuilders.post("/hello").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk)
    }


}
