<template>
  <div class="component-index">
    <!-- <router-link to="/login">login</router-link> -->
    <div class="new-idea">
      <div class="new-idea-title">你在想什么？</div>
      <textarea class="new-idea-input" v-model="newIdeaContent">{{newIdeaContent}}</textarea>
      <div class="new-idea-operation">
        <button class="btn-confirm" @click="submit">发布</button>
      </div>
    </div>
    <div class="idea-list">
      <div class="idea-item" v-for="(item, index) in ideaList" v-bind:class="{ last: index === ideaList.length - 1}">
        <div class="idea-info">
          <span class="info-name">{{item.author}}</span>
          <span class="info-time">{{item.createTime | time-filter}}</span>
        </div>
        <div class="idea-content">
          {{item.content}}
        </div>
        <div class="idea-append" v-for="appendItem in item.appendList" v-if="spreadIdx === index">
          <div class="append-item">
            <div class="append-info">{{appendItem.createTime | time-filter}} 补充</div>
            <div class="append-content">{{appendItem.content}}</div>
          </div>
        </div>
        <div class="idea-operation">
          <span class="spread" @click="showAppend(index)" v-show="item.appendList.length > 0">{{spreadIdx !== index ? '展开附言' : '收起'}}</span>
          <!-- 用于占位 -->
          <span class="spread"></span>
          <span class="append" @click="append(item.content, item._id, index)">Append</span>
          <span class="delete" style="display: none;">Delete</span>
        </div>
      </div>
      <div class="load-more-wrapper">
        <div class="has-next" v-if="hasNext" @click="loadMore">点击加载更多</div>
        <div v-else>没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      baseUri: 'http://127.0.0.1:8084/api',
      newIdeaContent: '',
      curPageNo: 1,
      curPageSize: 5,
      ideaList: [],
      hasNext: true,
      isLoading: false,
      userInfo: {
        author: '',
        isLogin: false,
      },
      spreadIdx: -1, // 展开附言索引，-1 表示均不展开
    };
  },
  beforeCreate() {

  },
  created() {
    this.fetchIdeaList(this.curPageNo, this.curPageSize);
    this.newIdeaContent = localStorage.getItem('newIdeaContent') || '';
  },
  watch: {
    newIdeaContent(val) {
      localStorage.setItem('newIdeaContent', val);
    },
  },
  methods: {
    submit() {
      if (!this.userInfo.isLogin) {
        this.needLogin();
        return;
      }

      this.$http.post('ideas', {
        content: this.newIdeaContent,
        author: this.userInfo.author,
      }).then((res) => {
        const body = res.body;

        if (body.code === 200) {
          // 发布成功
          alert('发布成功');
          this.fetchIdeaList(1, this.curPageSize);
          this.curPageNo = 1;
          this.newIdeaContent = '';
          localStorage.removeItem('newIdeaContent');
        } else if (body.code === 300) {
          alert('发布失败');
        } else if (body.code === 400) {
          alert('请先登录');
          this.$router.push('/login');
        }
      }, (err) => {
        console.error(err);
      });
    },
    loadMore() {
      this.fetchIdeaList(this.curPageNo, this.curPageSize);
    },
    fetchIdeaList(pageNo, pageSize) {
      if (!this.isLoading) {
        this.isLoading = true;
        this.$http.get(`ideas?pageNo=${pageNo}&pageSize=${pageSize}`)
          .then((res) => {
            // 若是第一页，则对 ideaList 执行赋值操作而非连接 concat
            if (res.body.code !== 200) {
              this.needLogin();
            } else {
              if (pageNo === 1) {
                this.ideaList = res.body.data.list;
              } else {
                this.ideaList = this.ideaList.concat(res.body.data.list);
              }
              this.userInfo = res.body.data.userInfo;
              this.curPageNo += 1;
              this.isLoading = false;

              if (res.body.data.list.length === 0) {
                this.hasNext = false;
              }
            }
          }, (err) => {
            console.error(err);
            this.isLoading = false;
          });
      }
    },
    append(content, _id, index) {
      if (!this.userInfo.isLogin) {
        this.needLogin();
        return;
      }

      const ret = prompt(`为“${content}”添加新的附言`);

      if (ret) {
        this.$http.post(`idea/${_id}`, {
          content: ret,
          author: this.userInfo.author,
        }).then((res) => {
          if (res.body.code === 400) {
            this.needLogin();
          } else if (res.body.code === 200) {
            this.ideaList[index].appendList.push({
              content: ret,
              author: this.userInfo.author,
              createTime: new Date(),
            });

            // 展开当前 idea append
            this.spreadIdx = index;
          }
        }, (err) => {
          console.error(err);
        });
      }
    },
    showAppend(index) {
      if (this.spreadIdx === index) {
        this.spreadIdx = -1;
      } else {
        this.spreadIdx = index;
      }
    },
    needLogin() {
      this.$router.push('login');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    // width 720px
  .component-index
    width 720px

  @media screen and (max-width: 600px)
    .component-index
      width: 100%;

  // @media screen and (min-width: 601px)
  //   .component-index
  //     width: 720px;

  .component-index
    padding 10px 10px
    box-sizing border-box
    margin 0 auto

    .new-idea
      background-color #fff
      border 1px solid #e2e2e2
      border-radius 3px

      .new-idea-title
        padding 10px
        font-size 12px
        line-height 120%
        text-align left
        border-bottom 1px solid #e2e2e2
        color #ccc

      .new-idea-input
        padding 10px
        width 100%
        height 100px
        background-color #f9f9f9
        border-bottom 1px solid #e2e2e2
        box-sizing border-box
        border none
        resize none
        outline none

      .new-idea-operation
        padding 10px

        .btn-confirm
          color #333
          font-weight bolder
          cursor pointer

    .idea-list
      width 100%
      margin-top 20px

      .idea-item
        border 1px solid #e2e2e2
        border-bottom none
        padding 10px

        &.last
          border-bottom 1px solid #e2e2e2

        .idea-info
          .info-name
            color #000
            font-size 14px
            font-weight bolder
          .info-time
            color #ccc
            font-size 11px

        .idea-content
          font-size 14px
          line-height 150%

        .idea-append

          .append-item
            border-top 1px solid #e2e2e2
            margin: 10px 0 0;
            padding 10px 10px 0;

            .append-info
              color #ccc
              font-size 12px

            .append-content
              font-size 14px

        .idea-operation
          text-align right
          font-size 11px
          line-height 100%
          color #ccc
          margin-top 5px
          display flex
          justify-content space-between

          .spread
            flex 1
            text-align left
            cursor pointer

          .append

            margin-right 5px
            cursor pointer

          .delete
            cursor not-allowed

      .load-more-wrapper
        text-align center
        font-size 12px
        color #666
        padding 10px

        .has-next
          cursor pointer
</style>
