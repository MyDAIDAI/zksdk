<template>
  <div class="layout">
    <el-container>
      <el-header>
        <h1 style="text-align: center">中控SDK</h1>
      </el-header>
      <el-main>
        <el-row class="tac">
          <el-col :span="4">
            <el-card>
              <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo">
                <router-link v-for="(elem, index) in menu" :key="index" :to="elem.link" class="menu">
                  <el-menu-item :index="elem.active">
                    <i :class="elem.icon"></i>
                    <span slot="title">{{elem.title}}</span>
                  </el-menu-item>
                </router-link>
              </el-menu>
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card class="box-card">
              <slot></slot>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
  
</template>
<script>
  export default {
    name: 'layout',
    props: {
      activeIndex: {
        type: String,
        default: '1'
      },
      menu: {
        type: Array,
        default: function () {
          return [{
            link: '/list',
            title: '获取用户',
            icon: 'el-icon-tickets',
            active: '1'
          }, {
            link: '/user/create',
            title: '创建用户',
            icon: 'el-icon-plus',
            active: '2'
          }, {
            link: '/query',
            title: '查询记录',
            icon: 'el-icon-search',
            active: '3'
          }, {
            link: '/open',
            title: '远程开门',
            icon: 'el-icon-phone-outline',
            active: '4'
          }]
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style>
 .logo {
   font-size: 1rem;
   text-decoration: none;
 }
 .tac {
   display: flex;
   justify-content: space-between;
 }
 .el-menu {
   border-right: 0
 }
 .menu {
   text-decoration: none
 }
</style>

