// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { posts } from './index';

// 유저 프로필 등록 API
function PostUserProfile(image) {
  const formData = new FormData();
  formData.append('avatar', image);
  try {
    return posts.post('/img', formData);
  } catch (err) {
    console.log(err);
    return null;
  }
}

//유저 포스트 등록 API
function createPostUser(image) {
  const formData = new FormData();
  formData.append('post', image);
  try {
    return posts.post('/', formData);
  } catch (err) {
    console.log(err);
    return null;
  }
}

//해당 유저 포스트 조회
function searchUserPost() {
  return posts.get('/');
}
// 학습 노트 데이터 목록을 조회하는 API
// function fetchPosts() {
//   return posts.get('/');
// }

// // 특정 학습 노트를 조회하는 API
// function fetchPost(postId) {
//   return posts.get(postId);
// }

// // 학습 노트 데이터를 삭제하는 API
// function deletePost(postId) {
//   return posts.delete(postId);
// }

// // 학습 노트 데이터를 수정하는 API
// function editPost(postId, postData) {
//   return posts.put(postId, postData);
// }

export { PostUserProfile, createPostUser, searchUserPost };
