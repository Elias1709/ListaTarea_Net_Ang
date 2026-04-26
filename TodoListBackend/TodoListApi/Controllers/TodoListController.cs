using Azure;
using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Entidades;
using System.Net;

namespace TodoListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ILogger<TodoListController> _logger;


        public TodoListController(ApplicationDbContext db, ILogger<TodoListController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // GET: api/todolist
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            _logger.LogInformation("Se solicitó la lista de tareas");
            return await _db.TodoItems.ToListAsync();
        }

        // GET: api/todolist/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            var todo = await _db.TodoItems.FindAsync(id);
            if (todo == null)
                return NotFound();
            _logger.LogInformation("Tarea encontrada exitosamente con Id {Id}", todo.Id);
            return todo;
        }

        // POST: api/todolist
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem( TodoItem todo)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Intento de creación con datos inválidos: {@Todo}", todo);
                return BadRequest(ModelState);
            }

            _db.TodoItems.Add(todo);
            await _db.SaveChangesAsync();
            _logger.LogInformation("Tarea creada exitosamente con Id {Id}", todo.Id);
            return CreatedAtAction(nameof(GetTodoItem), new { id = todo.Id }, todo);
        }

        // PUT: api/todolist/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, TodoItem todo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _db.TodoItems.FindAsync(id);
            if (existing == null)
                return NotFound();

            existing.Title = todo.Title;
            existing.Description = todo.Description;
            existing.MaxCompletionDate = todo.MaxCompletionDate;
            existing.IsCompleted = todo.IsCompleted;

            await _db.SaveChangesAsync();
            _logger.LogInformation("Tarea actualizada exitosamente con Id {Id}", todo.Id);
            return NoContent();
        }

        // DELETE: api/todolist/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todo = await _db.TodoItems.FindAsync(id);
            if (todo == null)
                return NotFound();

            _db.TodoItems.Remove(todo);
            await _db.SaveChangesAsync();
            _logger.LogInformation("Tarea eliminada exitosamente con Id {Id}", todo.Id);
            return NoContent();
        }




    }
}
