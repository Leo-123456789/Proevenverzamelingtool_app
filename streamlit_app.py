import streamlit as st
from pathlib import Path
import os

# Page configuration
st.set_page_config(
    page_title="Proevenverzamelingtool",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom styling
st.markdown("""
    <style>
    [data-testid="stAppViewContainer"] {
        background-color: #f9fafb;
    }
    </style>
    """, unsafe_allow_html=True)

# Check if this is the React app or Streamlit interface
react_build_path = Path(__file__).parent / "dist" / "index.html"

if react_build_path.exists():
    # Serve React app if built
    st.markdown("# React app is ready to serve from built files")
else:
    # Show welcome message and instructions
    st.title("📊 Proevenverzamelingtool")
    st.markdown("""
    Welcome to the Excel File Upload Tool!

    ## Setup Instructions

    To get started with the React frontend:

    1. Install dependencies: `npm install`
    2. Build the React app: `npm run build`
    3. Restart this Streamlit app

    The React frontend will then be served automatically.

    ## Features

    - ✅ Upload Excel files (.xlsx, .xls, .csv)
    - ✅ View data in an interactive table
    - ✅ Export data to CSV
    - ✅ Load sample data for testing
    - ✅ Responsive design
    - ✅ Accessibility support

    ---

    **Current Status**: Waiting for React frontend build...
    """)
