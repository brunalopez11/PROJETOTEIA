package com.teia.sitebackend.service;

import com.teia.sitebackend.model.Candidato;
import com.teia.sitebackend.repository.CandidatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatoService {
    private final CandidatoRepository candidatoRepository;

    public CandidatoService(CandidatoRepository candidatoRepository) { 
        this.candidatoRepository = candidatoRepository;
    }

    //LISTAR
    public List<Candidato> getAll(){
        return candidatoRepository.findAll();
    }
    
    //OBTER POR ID
    public Optional<Candidato> getById(Integer id){
        return candidatoRepository.findById(id);
    }
    
    //CADASTRAR
    public Candidato save(Candidato candidato){
        return candidatoRepository.save(candidato);
    }
    
    //DELETAR
    public void delete(Integer id){
        candidatoRepository.deleteById(id);
    }
    
    //BUSCAR POR EMAIL
    public Optional<Candidato> findByEmail(String email){
        return candidatoRepository.findByEmail(email);
    }
    
    //VALIDAR LOGIN
    public Optional<Candidato> validarLogin(String email, String senha){
        Optional<Candidato> candidato = candidatoRepository.findByEmail(email);
        if(candidato.isPresent() && candidato.get().getSenha().equals(senha)){
            return candidato;
        }
        return Optional.empty();
    }
    
    //VERIFICAR SE EMAIL JÁ EXISTE
    public boolean emailJaExiste(String email){
        return candidatoRepository.existsByEmail(email);
    }
    
    //VERIFICAR SE CPF JÁ EXISTE  
    public boolean cpfJaExiste(String cpf){
        return candidatoRepository.existsByCpf(cpf);
    }
}
