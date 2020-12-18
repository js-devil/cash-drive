<template>
  <header class="topbar" data-navbarbg="skin6">
    <nav class="navbar top-navbar navbar-expand-md">
      <div class="navbar-header" data-logobg="skin6">
        <!-- This is for the sidebar toggle which is visible on mobile only -->
        <a
          class="nav-toggler waves-effect waves-light d-block d-md-none"
          href="javascript:void(0)"
          ><i class="ti-menu ti-close"></i
        ></a>
        <div class="navbar-brand">
          <!-- Logo icon -->
          <a href="#">
            <b class="logo-icon">
              <!-- Light Logo icon -->
              <img src="/img/logo.png" alt="homepage" class="light-logo" />
            </b>
          </a>
        </div>
        <a
          class="topbartoggler d-block d-md-none waves-effect waves-light"
          href="javascript:void(0)"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ><i class="ti-more"></i
        ></a>
      </div>

      <div class="navbar-collapse collapse" id="navbarSupportedContent">
        <ul class="navbar-nav float-left mr-auto ml-3 pl-1"></ul>
        <ul class="navbar-nav float-right">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="javascript:void(0)"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src="~/assets/img/user.svg"
                alt="user"
                class="rounded-circle"
                width="40"
              />
              <span class="ml-2">
                <span class="text-white font-weight-bold text-capitalize">{{
                  userNames
                }}</span>
                <i class="feather text-white icon-chevron-down svg-icon"></i
              ></span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right user-dd animated flipInY"
            >
              <n-link class="dropdown-item" to="/loans"
                ><i class="feather icon-bar-chart-2 svg-icon mr-2 ml-1"></i> My
                Loans</n-link
              >
              <div class="dropdown-divider"></div>
              <n-link class="dropdown-item" to="/user/profile"
                ><i class="feather icon-user svg-icon mr-2 ml-1"></i> My
                Profile</n-link
              >
              <div class="dropdown-divider"></div>
              <n-link class="dropdown-item" to="/user/card"
                ><i class="feather icon-credit-card svg-icon mr-2 ml-1"></i> My
                Cards</n-link
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void(0)" @click="logout"
                ><i class="feather icon-power svg-icon mr-2 ml-1"></i> Logout</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  middleware: 'authenticated',
};
</script>

<style scoped>
.topbar .top-navbar {
  margin-top: -1px;
}

.topbar .top-navbar .navbar-header .navbar-brand {
  padding: 0;
  background-color: #00162a;
}

.logo-icon img {
  height: 75px;
  padding: 4.4px;
}
</style>
