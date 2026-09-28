document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     STAT COUNTER
  ========================= */

  const counters = document.querySelectorAll('.stat-number');

  const animateCounters = () => {

    counters.forEach(counter => {

      const target = Number(counter.getAttribute('data-target'));
      const duration = 1200;
      const startTime = performance.now();

      const updateCount = (currentTime) => {

        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        const currentValue = Math.floor(target * progress);

        counter.innerText =
          currentValue >= 1000
            ? `${(currentValue / 1000).toFixed(1)}K+`
            : currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = `${Math.floor(target / 1000)}K+`;
        }
      };

      requestAnimationFrame(updateCount);

    });
  };


  const statsSection = document.querySelector('.stats-section');

  if (statsSection) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            animateCounters();
            observer.disconnect();

          }

        });

      },
      {
        threshold: 0.5
      }
    );

    observer.observe(statsSection);
  }


  /* =========================
     AGRISMART MODAL
  ========================= */

  const exploreButton =
    document.getElementById('agrismartExplore');

  const projectModal =
    document.getElementById('agrismartModal');

  const closeButton =
    document.getElementById('closeAgrismart');


  if (
    exploreButton &&
    projectModal &&
    closeButton
  ) {

    exploreButton.addEventListener('click', (event) => {

      event.preventDefault();

      projectModal.classList.add('active');

      document.body.classList.add('modal-open');

      projectModal.scrollTop = 0;

    });


    closeButton.addEventListener(
      'click',
      closeProject
    );


    projectModal.addEventListener(
      'click',
      (event) => {

        if (event.target === projectModal) {
          closeProject();
        }

      }
    );


    function closeProject() {

      projectModal.classList.remove('active');

      document.body.classList.remove('modal-open');

    }


    document.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key === 'Escape' &&
          projectModal.classList.contains('active')
        ) {

          closeProject();

        }

      }
    );

  }

});