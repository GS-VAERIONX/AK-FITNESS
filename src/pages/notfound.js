/* ============================================
   A K FITNESS — Not Found Page (404)
   ============================================ */

export function render(container) {
  container.innerHTML = `
    <div class="not-found-page">
      <div class="reveal-scale">
        <h1>404</h1>
        <h2 style="margin-bottom: var(--space-4);">Page Not Found</h2>
        <p class="text-secondary">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a href="#/home" class="btn btn-primary mt-6">
          Return to Home
        </a>
      </div>
    </div>
  `;
}
