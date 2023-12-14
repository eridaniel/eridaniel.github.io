<?php
$file = 'tasks.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Leer tareas desde el archivo JSON
    $tasks = json_decode(file_get_contents($file), true);
    echo json_encode($tasks);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Agregar una nueva tarea
    $data = json_decode(file_get_contents('php://input'), true);
    $tasks = json_decode(file_get_contents($file), true);

    $newTask = [
        'id' => uniqid(),
        'description' => $data['description']
    ];

    $tasks[] = $newTask;
    file_put_contents($file, json_encode($tasks));

    echo json_encode(['success' => true]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Eliminar una tarea
    $taskId = $_GET['id'];
    $tasks = json_decode(file_get_contents($file), true);

    $tasks = array_filter($tasks, function ($task) use ($taskId) {
        return $task['id'] !== $taskId;
    });

    file_put_contents($file, json_encode(array_values($tasks)));

    echo json_encode(['success' => true]);
}
