package com.bsonmez.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bsonmez.todo.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
	
	List<Todo> findByPublished(boolean published);
	List<Todo> findByTitleContaining(String title);

}
