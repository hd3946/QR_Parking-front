export function fileUpload(selectFiles) {
  console.log('파일업로드 실행', selectFiles.files);
  let selectFile = null;
  // 선택된 파일이 있는가?
  if (0 < selectFiles.files.length) {
    // 0 번째 파일을 가져 온다.
    selectFile = selectFiles.files[0];
    // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
    let fileExt = selectFile.name.substring(
      selectFile.name.lastIndexOf('.') + 1,
    );
    // 소문자로 변환
    fileExt = fileExt.toLowerCase();
    // 이미지 확장자 체크, 5메가 바이트 이하 인지 체크 && this.selectFile.size <= 15 * 1024 * 1024
    if (['jpeg', 'png', 'gif', 'bmp'].includes(fileExt)) {
    } else {
      alert('파일을 다시 선택해 주세요.');
      selectFile = null;
    }
  } else {
    // 파일을 선택하지 않았을때
    selectFile = null;
  }
  return selectFile;
}
