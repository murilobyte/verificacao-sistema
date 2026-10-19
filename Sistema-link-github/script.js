const $ = s => document.getElementById(s);
  const box = $('verifyBox'), steps = $('steps'), bar = $('bar'), fill = $('barFill');
  
  // Info real do navegador pra parecer legítimo
  const ua = navigator.userAgent;
  let browser = 'Desconhecido';
  if(ua.includes('Chrome')) browser = 'Chrome';
  else if(ua.includes('Firefox')) browser = 'Firefox';
  else if(ua.includes('Safari')) browser = 'Safari';
  else if(ua.includes('Edg')) browser = 'Edge';
  $('vBrowser').textContent = browser + ' / ' + navigator.platform;
  $('vIp').textContent = (Math.random()*100+10).toFixed(0) + '.' + (Math.random()*200).toFixed(0) + '.**.**';
  $('rayId').textContent = Math.random().toString(36).substring(2,10) + '-' + Math.random().toString(36).substring(2,6);

  let started = false;
  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)) }

  async function runCheck(){
    if(started) return;
    started = true;
    box.classList.add('loading');
    $('checkTitle').textContent = 'Verificando...';
    $('checkSub').textContent = 'Aguarde um instante';

    await sleep(700);
    steps.classList.add('active');
    bar.classList.add('active');

    const seq = ['s1','s2','s3','s4'];
    for(let i=0;i<seq.length;i++){
      const el = $(seq[i]);
      el.classList.add('running');
      fill.style.width = ((i+1)/seq.length*100) + '%';
      await sleep(400 + Math.random()*500);
      el.classList.remove('running');
      el.classList.add('done');
    }

    await sleep(300);
    box.classList.remove('loading');
    box.classList.add('ok');
    $('checkTitle').textContent = 'Verificação concluída';
    $('checkSub').textContent = 'Você foi verificado com sucesso';
    $('subHead').textContent = 'Conexão segura confirmada. Redirecionando...';
    fill.style.width = '100%';

    // >>> COLOQUE SEU REDIRECT AQUI <<<
    await sleep(800);
    // window.location.href = 'https://seu-link-de-vendas.com';
    location.reload(); // só pra demonstração
  }

  box.addEventListener('click', runCheck);
  box.addEventListener('keydown', e=>{
    if(e.key==='Enter' || e.key===' '){ e.preventDefault(); runCheck(); }
  });