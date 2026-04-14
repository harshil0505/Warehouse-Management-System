package com.warehouse.AppConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class ImageConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String path = System.getProperty("user.dir") + "/Backend/QRcode_product/";

        registry.addResourceHandler("/QRcode_product/**")
                .addResourceLocations("file:" + path);
    }
}