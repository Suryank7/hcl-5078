package org.hcl2.hcl2.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.hcl2.hcl2.entity.Post;
import org.hcl2.hcl2.repository.PostRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

public class PostController {
    @RestController
    @RequestMapping("/api/v1/posts")

    @AllArgsConstructor
    public class PostController {
        private final PostRepository postRepository;

        @GetMapping
        public Post create(@Valid @RequestBody Post req, Authentication auth){
            return posts.save(new Post()).findAllByOrderByCreatedAtDesc();
        }
        @PostMapping
        public Post create(@Valid @RequestBody Post req, Authentication auth ){
            return posts.save(new Post(req.getTitle(), req.getContent(), auth.getName()));
        }
}
