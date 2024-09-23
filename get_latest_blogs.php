<?php
// Путь к директории с блогами
$blogs_dir = 'blogs';
// Получаем список файлов в директории
$files = scandir($blogs_dir, SCANDIR_SORT_DESCENDING);
$latest_blogs = [];

// Проходим по файлам и извлекаем заголовок и первую строку из абзаца
foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'html' && count($latest_blogs) < 5) {
        $content = file_get_contents($blogs_dir . '/' . $file);

        // Извлекаем заголовок
        preg_match('/<h1>(.*?)<\/h1>/', $content, $title_match);
        $title = $title_match[1] ?? 'Без заголовка';

        // Извлекаем первую строку абзаца
        preg_match('/<p>(.*?)<\/p>/', $content, $description_match);
        $description = $description_match[1] ?? 'Нет описания';

        // Добавляем информацию в массив
        $latest_blogs[] = [
            'title' => $title,
            'description' => $description,
            'link' => $blogs_dir . '/' . $file,
            'icon' => 'icons/apps/blog.png' // Путь к иконке
        ];
    }
}

// Возвращаем результат в формате JSON
header('Content-Type: application/json');
echo json_encode($latest_blogs);
?>
