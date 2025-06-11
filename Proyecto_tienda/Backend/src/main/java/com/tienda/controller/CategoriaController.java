package com.tienda.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.model.Categoria;
import com.tienda.repository.CategoriaRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    private final CategoriaRepository repo;

    public CategoriaController(CategoriaRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Categoria> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Categoria guardar(@RequestBody Categoria c) {
        return repo.save(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Categoria actualizar(@PathVariable Long id, @RequestBody Categoria categoriaActualizada) {
        return repo.findById(id)
            .map(c -> {
                c.setNombre(categoriaActualizada.getNombre());
                return repo.save(c);
            })
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
}

}
