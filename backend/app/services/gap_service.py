from app.agents.gap_agent import GapAgent
from app.services.pdf_service import PDFService


class GapService:

    def __init__(self):

        self.pdf = PDFService()

        self.agent = GapAgent()

    def analyze_pdf(
        self,
        pdf_bytes: bytes,
    ):

        text = self.pdf.extract_text(pdf_bytes)

        return self.agent.analyze(text)