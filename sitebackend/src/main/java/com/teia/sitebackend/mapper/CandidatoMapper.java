package com.teia.sitebackend.mapper;

import com.teia.sitebackend.dto.CandidatoCadastroRequest;
import com.teia.sitebackend.dto.CandidatoDTO;
import com.teia.sitebackend.model.Candidato;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper para conversão entre Candidato (Entity) e DTOs
 */
@Component
public class CandidatoMapper {
    
    /**
     * Converte Entity para DTO (sem senha)
     */
    public CandidatoDTO toDTO(Candidato candidato) {
        if (candidato == null) {
            return null;
        }
        
        CandidatoDTO dto = new CandidatoDTO();
        dto.setCandidato_id(candidato.getCandidato_id());
        dto.setNome(candidato.getNome());
        dto.setCpf(candidato.getCpf());
        dto.setEmail(candidato.getEmail());
        // Não inclui senha por segurança
        
        return dto;
    }
    
    /**
     * Converte lista de Entities para lista de DTOs
     */
    public List<CandidatoDTO> toDTOList(List<Candidato> candidatos) {
        if (candidatos == null) {
            return null;
        }
        
        return candidatos.stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    
    /**
     * Converte Request DTO para Entity (para cadastro)
     */
    public Candidato toEntity(CandidatoCadastroRequest request) {
        if (request == null) {
            return null;
        }
        
        Candidato candidato = new Candidato();
        candidato.setNome(request.getNome());
        candidato.setCpf(request.getCpf());
        candidato.setEmail(request.getEmail());
        candidato.setSenha(request.getSenha());
        
        return candidato;
    }
    
    /**
     * Atualiza Entity com dados do Request DTO
     */
    public void updateEntityFromRequest(Candidato candidato, CandidatoCadastroRequest request) {
        if (candidato == null || request == null) {
            return;
        }
        
        if (request.getNome() != null) {
            candidato.setNome(request.getNome());
        }
        if (request.getCpf() != null) {
            candidato.setCpf(request.getCpf());
        }
        if (request.getEmail() != null) {
            candidato.setEmail(request.getEmail());
        }
        if (request.getSenha() != null) {
            candidato.setSenha(request.getSenha());
        }
    }
}
