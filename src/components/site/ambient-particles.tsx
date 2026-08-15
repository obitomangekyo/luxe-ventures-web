export function AmbientParticles() {
  const particles = Array.from({ length: 18 }, (_, index) => ({
    left: `${(index * 31) % 100}%`,
    top: `${(index * 47) % 100}%`,
    delay: `${(index % 6) * 1.4}s`,
    size: `${index % 3 === 0 ? 5 : 3}px`,
  }));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden opacity-70"
    >
      {particles.map((particle) => (
        <span
          className="atelier-particle absolute rounded-full bg-brand-detail/35 blur-[1px]"
          key={JSON.stringify(particle)}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
