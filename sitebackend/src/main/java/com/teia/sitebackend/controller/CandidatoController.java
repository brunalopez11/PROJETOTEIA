package com.teia.sitebackend.controller;

import com.teia.sitebackend.dto.ApiResponse;
import com.teia.sitebackend.dto.CandidatoCadastroRequest;
import com.teia.sitebackend.dto.CandidatoDTO;
import com.teia.sitebackend.dto.LoginRequest;
import com.teia.sitebackend.factory.ResponseFactory;
import com.teia.sitebackend.mapper.CandidatoMapper;
import com.teia.sitebackend.model.Candidato;
import com.teia.sitebackend.service.ICandidatoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/candidato")
public class CandidatoController {

    private final ICandidatoService candidatoService;
    private final CandidatoMapper candidatoMapper;

    public CandidatoController(ICandidatoService candidatoService, CandidatoMapper candidatoMapper) {
        this.candidatoService = candidatoService;
        this.candidatoMapper = candidatoMapper;
    }

    /**
     * Lista todos os candidatos (sem expor senhas)
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAll(){
        List<Candidato> candidatos = candidatoService.getAll();
        List<CandidatoDTO> candidatosDTO = candidatoMapper.toDTOList(candidatos);
        return ResponseFactory.success("Candidatos listados com sucesso", candidatosDTO);
    }

    /**
     * Cadastra um novo candidato
     */
    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CandidatoCadastroRequest request){
        // Converte DTO para Entity
        Candidato candidato = candidatoMapper.toEntity(request);
        
        // Salva (validações são feitas no service)
        Candidato savedCandidato = candidatoService.save(candidato);
        
        // Converte para DTO (sem senha)
        CandidatoDTO candidatoDTO = candidatoMapper.toDTO(savedCandidato);
        
        return ResponseFactory.created("Cadastro realizado com sucesso!", candidatoDTO);
    }
    
    /**
     * Realiza login do candidato
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        // Valida login (lança UnauthorizedException se inválido)
        Optional<Candidato> candidato = candidatoService.validarLogin(
            loginRequest.getEmail(), 
            loginRequest.getSenha()
        );
        
        // Converte para DTO (sem senha)
        CandidatoDTO candidatoDTO = candidatoMapper.toDTO(candidato.get());
        
        return ResponseFactory.success("Login realizado com sucesso!", candidatoDTO);
    }
}
