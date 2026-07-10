import fitz


class PDFService:

    def extract(self, pdf_bytes: bytes):

        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        text = ""

        for page in doc:
            text += page.get_text()

        metadata = doc.metadata or {}

        return {
            "title": metadata.get("title"),
            "authors": metadata.get("author"),
            "page_count": len(doc),
            "text": text,
        }

    def extract_text(
        self,
        pdf_bytes: bytes,
    ):

        doc = fitz.open(
            stream=pdf_bytes,
            filetype="pdf",
        )

        text = ""

        for page in doc:
            text += page.get_text()

        return text