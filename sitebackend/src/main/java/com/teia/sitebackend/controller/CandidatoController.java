package com.teia.sitebackend.controller;

import com.teia.sitebackend.dto.ApiResponse;
import com.teia.sitebackend.dto.LoginRequest;
import com.teia.sitebackend.model.Candidato;
import com.teia.sitebackend.service.CandidatoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/candidato")
public class CandidatoController {

    //Injeção de dependência
    private final CandidatoService candidatoService;

    public CandidatoController(CandidatoService candidatoService) {
        this.candidatoService = candidatoService;
    }

    @GetMapping
    public List<Candidato> getAll(){
        return candidatoService.getAll();
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody Candidato candidato){
        try {
            // Validar se email já existe
            if(candidatoService.emailJaExiste(candidato.getEmail())){
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Este email já está cadastrado"));
            }
            
            // Validar se CPF já existe
            if(candidatoService.cpfJaExiste(candidato.getCpf())){
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Este CPF já está cadastrado"));
            }
            
            Candidato savedCandidato = candidatoService.save(candidato);
            return ResponseEntity.ok(
                new ApiResponse(true, "Cadastro realizado com sucesso!", savedCandidato)
            );
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "Erro interno do servidor"));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest){
        try {
            Optional<Candidato> candidato = candidatoService.validarLogin(
                loginRequest.getEmail(), 
                loginRequest.getSenha()
            );
            
            if(candidato.isPresent()){
                // Remove a senha da resposta por segurança
                Candidato candidatoResponse = candidato.get();
                candidatoResponse.setSenha(null);
                
                return ResponseEntity.ok(
                    new ApiResponse(true, "Login realizado com sucesso!", candidatoResponse)
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Email ou senha incorretos"));
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "Erro interno do servidor"));
        }
    }
}
