from app.agents.summary_agent import SummaryAgent
from app.services.pdf_service import PDFService


class SummaryService:

    def __init__(self):

        self.agent = SummaryAgent()

        self.pdf = PDFService()

    def summarize_pdf(
        self,
        pdf_bytes: bytes,
    ):

        text = self.pdf.extract_text(
            pdf_bytes,
        )

        return self.agent.summarize(
            text,
        )