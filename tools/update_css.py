import os

path = 'style.css'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_styles = """
/* NEW FEATURES ADAPTED FROM VISHWA */

.bg-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: -1;
    transform: perspective(500px) rotateX(60deg) translateY(-100px);
    transform-origin: top;
    animation: gridMove 20s linear infinite;
    opacity: 0.5;
    pointer-events: none;
}

@keyframes gridMove {
    from { background-position: 0 0; }
    to { background-position: 0 500px; }
}

.hero-text h1 {
    position: relative;
    cursor: default;
}

.hero-text h1:hover {
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}

.hero-text h1::before,
.hero-text h1::after {
    content: 'Pal Piyushkumar Patel';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    transition: 0.3s;
    pointer-events: none;
}

.hero-text h1:hover::before {
    color: var(--accent-blue);
    z-index: -1;
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
    opacity: 1;
}

.hero-text h1:hover::after {
    color: var(--accent-pink);
    z-index: -2;
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    opacity: 1;
}

@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
    100% { transform: translate(0); }
}

/* PROJECT MODAL STYLES */
.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    visibility: hidden;
    opacity: 0;
    transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.project-modal.active {
    visibility: visible;
    opacity: 1;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
}

.modal-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    background: var(--bg-secondary);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    transform: translateY(50px) scale(0.9);
    transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-modal.active .modal-container {
    transform: translateY(0) scale(1);
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    background: var(--accent-pink);
    transform: rotate(90deg);
}

.modal-content {
    padding: 3rem;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: var(--gradient-main);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.modal-subtitle {
    color: var(--accent-blue);
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    letter-spacing: 2px;
}

.modal-tech-stack {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 1.5rem 0;
}

.modal-tech-stack span {
    background: rgba(0, 210, 255, 0.1);
    color: var(--accent-blue);
    padding: 5px 15px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    border: 1px solid rgba(0, 210, 255, 0.2);
}

.modal-body ul {
    list-style: none;
    margin-top: 2rem;
}

.modal-body li {
    position: relative;
    padding-left: 25px;
    margin-bottom: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

.modal-body li::before {
    content: '>';
    position: absolute;
    left: 0;
    color: var(--accent-blue);
    font-weight: 800;
}

.modal-footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}
"""

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
    f.write(new_styles)
