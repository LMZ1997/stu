import htmlDocx from "html-docx-js/dist/html-docx";
import FileSaver from "file-saver";

export default function docxExport(dom, fileName) {
  let options = {
    maxWidth: 700
  };
  let img = dom.getElementsByTagName('img');
  for (let i = 0; i < img.length; i++) {
    let w = Math.min(img[i].width, options.maxWidth);
    let h = img[i].height * (w / img[i].width);
    img[i].width = w;
    img[i].height = h;
  }
  let content = `<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>${dom.innerHTML}</body></html>`
  let converted = htmlDocx.asBlob(content);

  FileSaver.saveAs(converted, `${fileName}.docx`);
}
