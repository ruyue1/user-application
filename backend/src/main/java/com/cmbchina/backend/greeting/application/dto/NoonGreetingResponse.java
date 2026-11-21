package com.cmbchina.backend.greeting.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoonGreetingResponse {

    @NotBlank
    private String noonGreetingText;
}
