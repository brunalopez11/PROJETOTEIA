package com.teia.sitebackend.service;

import com.teia.sitebackend.exception.DuplicateResourceException;
import com.teia.sitebackend.exception.ResourceNotFoundException;
import com.teia.sitebackend.exception.UnauthorizedException;
import com.teia.sitebackend.model.Candidato;
import com.teia.sitebackend.repository.CandidatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatoService implements ICandidatoService {
    private final CandidatoRepository candidatoRepository;

    public CandidatoService(CandidatoRepository candidatoRepository) { 
        this.candidatoRepository = candidatoRepository;
    }

    @Override
    public List<Candidato> getAll(){
        return candidatoRepository.findAll();
    }
    
    @Override
    public Optional<Candidato> getById(Integer id){
        return candidatoRepository.findById(String.valueOf(id));
    }
    
    @Override
    public Candidato save(Candidato candidato){
        // Validar duplicação de email
        if (candidato.getCandidato_id() == null && emailJaExiste(candidato.getEmail())) {
            throw new DuplicateResourceException("Este email já está cadastrado");
        }
        
        // Validar duplicação de CPF
        if (candidato.getCandidato_id() == null && cpfJaExiste(candidato.getCpf())) {
            throw new DuplicateResourceException("Este CPF já está cadastrado");
        }
        
        return candidatoRepository.save(candidato);
    }
    
    @Override
    public void delete(Integer id){
        if (!candidatoRepository.existsById(String.valueOf(id))) {
            throw new ResourceNotFoundException("Candidato não encontrado");
        }
        candidatoRepository.deleteById(String.valueOf(id));
    }
    
    @Override
    public Optional<Candidato> findByEmail(String email){
        return candidatoRepository.findByEmail(email);
    }
    
    @Override
    public Optional<Candidato> validarLogin(String email, String senha){
        Optional<Candidato> candidato = candidatoRepository.findByEmail(email);
        
        if (candidato.isEmpty()) {
            throw new UnauthorizedException("Email ou senha incorretos");
        }
        
        if (!candidato.get().getSenha().equals(senha)) {
            throw new UnauthorizedException("Email ou senha incorretos");
        }
        
        return candidato;
    }
    
    @Override
    public boolean emailJaExiste(String email){
        return candidatoRepository.existsByEmail(email);
    }
    
    @Override
    public boolean cpfJaExiste(String cpf){
        return candidatoRepository.existsByCpf(cpf);
    }
}
