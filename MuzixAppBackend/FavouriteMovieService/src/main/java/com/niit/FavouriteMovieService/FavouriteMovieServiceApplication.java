package com.niit.FavouriteMovieService;

import com.niit.FavouriteMovieService.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class FavouriteMovieServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FavouriteMovieServiceApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean jwtFilterBean(){
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new JwtFilter());
		filterRegistrationBean.addUrlPatterns("/api/v2/user/*");
		return filterRegistrationBean;
	}
}
