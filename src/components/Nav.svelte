<script>
  import { link } from '../utils/Router.svelte'
</script>

<style>
/* .lock-nav:not(:checked) + .lock-nav-tog + .side-nav, */
.lock-nav:not(:checked) + .lock-nav-tog + .side-nav:not(:hover) {
  border-top-left-radius: calc(var(--th-nav-el-height) / 2);
  border-top-right-radius: calc(var(--th-nav-el-height) / 2);
}

.lock-nav:not(:checked) + .lock-nav-tog + .side-nav:hover {
  border-top-right-radius: calc(var(--th-nav-el-height) / 2);
}

.lock-nav:checked + .lock-nav-tog + .side-nav .rounded {
  border-radius: 0%;
}

.side-nav {
  transition: width cubic-bezier(0.175, 0.885, 0.32, 1.1) 0.3s, border-radius 0.2s;
}
.rounded {
  border-radius: 50%;
  transition: border-radius 0.3s;
}
</style>

<!-- <nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
		<li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li> -->

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!-- <li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog</a></li>
	</ul>
</nav> -->
<!-- Checkbox to enable sticky nav withdrawal -->
<input type="checkbox" class="lock-nav" id="lock-nav">
<label for="lock-nav" class="lock-nav-tog">
  <i class="icon"></i>
</label>
<nav class="side-nav">
  <ul>
    <!-- List of links -->
    <!-- TODO: Update to use logged in users username -->
    <a href="/playlists" use:link>
      <li>
        <p>Playlists</p>
        <i class="icon">playlist_play</i>
      </li>
    </a>
    <a href="/tracks" use:link>
      <li>
        <p>Tracks</p>
        <i class="icon">audiotrack</i>
      </li>
    </a>
    <a href="/" use:link>
      <li>
        <p>Artists</p>
        <i class="icon">person</i>
      </li>
    </a>
    <a href="/" use:link>
      <li>
        <p>Albums</p>
        <i class="icon">album</i>
      </li>
    </a>
    <a href="/" use:link>
      <li>
        <p>Settings</p>
        <i class="icon">settings</i>
      </li>
    </a>
  </ul>
</nav>
