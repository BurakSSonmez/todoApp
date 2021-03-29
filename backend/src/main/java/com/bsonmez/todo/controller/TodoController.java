package com.bsonmez.todo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bsonmez.todo.model.Todo;
import com.bsonmez.todo.repository.TodoRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class TodoController {

	@Autowired
	TodoRepository todoRepository;

	@GetMapping("/todoes")
	public ResponseEntity<List<Todo>> getAllTodoes(@RequestParam(required = false) String title) {
		
		try {
			List<Todo> todoes = new ArrayList<Todo>();
			
			if(title == null)
				todoRepository.findAll().forEach(todoes::add);
			else
				todoRepository.findByTitleContaining(title).forEach(todoes::add);
			
			if(todoes.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(todoes, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/todoes/{id}")
	public ResponseEntity<Todo> getTodoById(@PathVariable("id") long id) {
		Optional<Todo> todoData = todoRepository.findById(id);
		
		if(todoData.isPresent()) {
			return new ResponseEntity<>(todoData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/todoes")
	public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
		
		try {
			Todo _todo = todoRepository.save(new Todo(todo.getTitle(), todo.getDescription(), false));
			return new ResponseEntity<>(_todo, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/todoes/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable("id") long id, @RequestBody Todo todo) {
		Optional<Todo> todoData = todoRepository.findById(id);
		
		if(todoData.isPresent()) {
			Todo _todo = todoData.get();
			_todo.setTitle(todo.getTitle());
			_todo.setDescription(todo.getDescription());
			_todo.setPublished(todo.isPublished());
			return new ResponseEntity<>(todoRepository.save(_todo), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/todoes/{id}")
	public ResponseEntity<HttpStatus> deleteTodo(@PathVariable("id") long id) {
		try {
			todoRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/todoes")
	public ResponseEntity<HttpStatus> deleteAllTodoes() {
		try {
			todoRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/todoes/published")
	public ResponseEntity<List<Todo>> findByPublished() {
		try {
			List<Todo> todoes = todoRepository.findByPublished(true);
			
			if(todoes.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(todoes, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}