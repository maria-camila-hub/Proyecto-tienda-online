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

import com.tienda.model.Producto;
import com.tienda.repository.ProductoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Producto> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Producto guardar(@RequestBody Producto p) {
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        return repo.findById(id)
            .map(p -> {
                p.setNombre(productoActualizado.getNombre());
                p.setPrecio(productoActualizado.getPrecio());
                p.setCategoria(productoActualizado.getCategoria());
                return repo.save(p);
            })
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
}

}
