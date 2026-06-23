// scroll reveal
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.rise');
  if(reduce){els.forEach(function(e){e.classList.add('in')});return;}
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);} });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e){io.observe(e)});
})();

// custom cursor + magnetic buttons + tilt (desktop, motion-on only)
// cursor colour is driven by CSS var --cur, so it themes itself per page
(function(){
  var fine = window.matchMedia('(pointer:fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!fine || reduce) return;

  var dot = document.createElement('div'); dot.className='cursor-dot';
  var ring = document.createElement('div'); ring.className='cursor-ring';
  document.body.appendChild(dot); document.body.appendChild(ring);
  document.body.classList.add('cur-on');

  var mx=window.innerWidth/2, my=window.innerHeight/2, rx=mx, ry=my, live=false;
  window.addEventListener('mousemove',function(e){
    mx=e.clientX; my=e.clientY;
    dot.style.transform='translate('+mx+'px,'+my+'px)';
    if(!live){live=true; document.body.classList.add('cur-live');}
  },{passive:true});
  document.addEventListener('mouseleave',function(){document.body.classList.remove('cur-live');live=false;});
  window.addEventListener('mousedown',function(){ring.classList.add('tap');});
  window.addEventListener('mouseup',function(){ring.classList.remove('tap');});

  (function loop(){
    rx+=(mx-rx)*0.18; ry+=(my-ry)*0.18;
    ring.style.transform='translate('+rx+'px,'+ry+'px)';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a,button,.tilt,.card,input,textarea').forEach(function(el){
    el.addEventListener('mouseenter',function(){ring.classList.add('hot');});
    el.addEventListener('mouseleave',function(){ring.classList.remove('hot');});
  });

  document.querySelectorAll('.mag').forEach(function(el){
    var s=0.4;
    el.addEventListener('mousemove',function(e){
      var r=el.getBoundingClientRect();
      el.style.transform='translate('+((e.clientX-(r.left+r.width/2))*s)+'px,'+((e.clientY-(r.top+r.height/2))*s)+'px)';
    });
    el.addEventListener('mouseleave',function(){el.style.transform='';});
  });

  document.querySelectorAll('[data-tilt-scope]').forEach(function(w){
    var ph=w.querySelector('.tilt'); if(!ph) return;
    w.addEventListener('mousemove',function(e){
      var r=w.getBoundingClientRect();
      var px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
      ph.style.transform='perspective(1100px) rotateY('+(px*9)+'deg) rotateX('+(-py*9)+'deg)';
    });
    w.addEventListener('mouseleave',function(){ph.style.transform='';});
  });
})();
