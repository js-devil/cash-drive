<template>
  <aside class="left-sidebar" data-sidebarbg="skin6">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar" data-sidebarbg="skin6">
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav">
        <ul id="sidebarnav">
          <li class="sidebar-item">
            <n-link
              class="sidebar-link sidebar-link"
              to="/dashboard"
              aria-expanded="false"
            >
              <i class="feather icon-home"></i>
              <span class="hide-menu">Dashboard</span></n-link
            >
          </li>
          <li class="list-divider"></li>
          <li class="nav-small-cap">
            <span class="hide-menu">Loans</span>
          </li>

          <li class="sidebar-item">
            <n-link class="sidebar-link" to="/loans" aria-expanded="false"
              ><i class="feather icon-bar-chart-2"></i
              ><span class="hide-menu">My Loans</span></n-link
            >
          </li>
          <li class="sidebar-item">
            <n-link class="sidebar-link" to="/loan/active" aria-expanded="false"
              ><i class="feather icon-activity"></i
              ><span class="hide-menu">Active Loan</span></n-link
            >
          </li>
          <!-- <li class="sidebar-item">
            <n-link class="sidebar-link" to="/loan/apply" aria-expanded="false"
              ><i class="feather icon-plus-circle"></i
              ><span class="hide-menu">Apply</span></n-link
            >
          </li> -->

          <li class="list-divider"></li>
          <li class="nav-small-cap">
            <!-- <span class="hide-menu">Applications</span> -->
          </li>
          <li class="sidebar-item">
            <a
              class="sidebar-link"
              href="javascript:void(0)"
              aria-expanded="false"
              ><i class="feather icon-file-text"></i
              ><span class="hide-menu">Applications</span></a
            >
          </li>
          <li class="sidebar-item">
            <n-link class="sidebar-link" to="/user/cards"
              ><i class="feather icon-credit-card"></i
              ><span class="hide-menu">Accounts</span></n-link
            >
          </li>
          <li class="sidebar-item">
            <n-link class="sidebar-link" to="/user/cards"
              ><i class="feather icon-credit-card"></i
              ><span class="hide-menu">Cards</span></n-link
            >
          </li>

          <li class="sidebar-item">
            <n-link class="sidebar-link" to="/user/profile"
              ><i class="feather icon-user"></i
              ><span class="hide-menu">Profile</span></n-link
            >
          </li>
          <li class="sidebar-item">
            <a
              class="sidebar-link sidebar-link"
              href="javascript:void(0)"
              @click="logout"
              ><i class="feather icon-log-out"></i
              ><span class="hide-menu">Logout</span></a
            >
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  middleware: 'authenticated',
};
</script>
