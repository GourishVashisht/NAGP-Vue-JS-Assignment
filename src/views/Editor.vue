<template>
  <div class="editor editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h2 class="text-xs-center">
            <span>{{pageHeader}}</span>&nbsp;Article
          </h2>
          <form @submit.prevent="submitArticle">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Title"
                v-model="title"
                @keydown="removeErrorMessage(0)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.title}}</div>

            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="What's this article about?"
                v-model="description"
                @keydown="removeErrorMessage(1)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.description}}</div>

            <fieldset class="form-group">
              <textarea
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                v-model="body"
                @keydown="removeErrorMessage(2)"
              ></textarea>
            </fieldset>
            <div class="error-text error-messages error-block-last">{{errors.body}}</div>

            <span class="tag-notification">* Please press 'Enter' to add more tags for the article</span>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter tags"
                v-model="tagName"
                @keyup="addTagToTaglist($event)"
              />
            </fieldset>
            <div class="tag-list-container">
              <div class="tag-list-block">
                <span class="tag-name tag-list" v-for="(tag, index) of tagList" :key="index">
                  <b-badge pill variant="secondary">
                    <fa-icon class="cross-icon" icon="times" @click="removeTagFromTagList(tag)" />
                    &nbsp;{{tag}}
                  </b-badge>
                </span>
              </div>
              <div style="float: right;">
                <button class="btn btn-lg pull-xs-right btn-success publish-button">Publish Article</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import articles from "@/store/modules/ArticleModule";
import { Article } from "@/models/Article";
import { ArticleFormErrors } from "@/models/Errors";

@Component
export default class Editor extends Vue {
  private title: string = "";
  private description: string = "";
  private body: string = "";
  private tagList: string[] = [];
  private tagName: string = "";
  private pageHeader: string = "";
  private errors: ArticleFormErrors = {
    title: "",
    body: "",
    description: ""
  };

  public submitArticle(): void {
    if (this.$route.params.slug) {
      articles
        .modifyArticle({
          slug: this.$route.params.slug,
          art: this.getUpdatedArticle()
        })
        .then(() => {
          this.$router.push("/articles/" + articles.article!.slug);
        })
        .catch((error) => {
          this.validateFormInputParameters(error.response.data.errors);
        });
    } else {
      articles
        .addArticle(this.getUpdatedArticle())
        .then(() => {
          this.$router.push("/articles/" + articles.article!.slug);
        })
        .catch((error) => {
          this.validateFormInputParameters(error.response.data.errors);
        });
    }
  }

  private async created() {
    if (this.$route.params.slug) {
      await articles.getArticle(this.$route.params.slug).then(() => {
        this.title = articles.article!.title;
        this.description = articles.article!.description;
        this.body = articles.article!.body;
        this.tagList = articles.article!.tagList;
      });
      this.pageHeader = "Edit";
    } else {
      this.pageHeader = "Add New";
    }
  }

  private addTagToTaglist(event: KeyboardEvent): void {
    if (event.code === "Enter") {
      if (!this.checkIfTagAlreadyPresent() && this.tagName) {
        this.tagList.push(this.tagName);
        this.tagName = "";
      }
    }
  }

  private checkIfTagAlreadyPresent(): boolean {
    return this.tagList.indexOf(this.tagName) >= 0 ? true : false;
  }

  private removeTagFromTagList(tagName: string): void {
    const tagNameIndex = this.tagList.indexOf(tagName);
    this.tagList.splice(tagNameIndex, 1);
  }

  private validateFormInputParameters(errors: any) {
    if (errors.title) {
      this.errors.title = "Title " + errors.title.join(" & ");
    }
    if (errors.body) {
      this.errors.body = "Body " + errors.body.join(" & ");
    }
    if (errors.description) {
      this.errors.description = "Description " + errors.description.join(" & ");
    }
  }

  private removeErrorMessage(fieldNumber: number): void {
    if (this.errors) {
      switch (fieldNumber) {
        case 0:
          this.errors!.title = "";
          break;
        case 1:
          this.errors!.description = "";
          break;
        case 2:
          this.errors!.body = "";
          break;
        default:
          break;
      }
    }
  }

  private getUpdatedArticle() {
    return {
      title: this.title,
      description: this.description,
      body: this.body,
      tagList: this.tagList
    };
  }
}
</script>

<style scoped>
.editor {
  margin-top: 60px;
}

.error-block-last {
  margin-bottom: 0 !important;
}

.tag-list-container {
  margin-top: 12px;
}

.tag-name {
  margin-right: 4px;
}

.tag-notification {
  color: rgb(185, 88, 101);
  font-size: 10px;
  font-weight: 500;
}

.tag-list-block {
  float: left;
  max-width: 300px;
}

.cross-icon:hover {
  cursor: pointer;
  color: rgb(255, 251, 0);
}
</style>