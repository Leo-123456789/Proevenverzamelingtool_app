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

# Path to React build
react_build_path = Path(__file__).parent / "dist" / "index.html"

if react_build_path.exists():
    # Serve React app
    with open(react_build_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    st.components.v1.html(html_content, height=1200, scrolling=True)
else:
    # Show setup message if React app not built
    st.title("📊 Proevenverzamelingtool Setup")
    st.warning("Build Required")
    st.markdown("""
    The React frontend hasn't been built yet. 
    
    Please run the following commands in your terminal:
    
    ```bash
    npm install --legacy-peer-deps
    npm run build
    ```
    
    Then refresh this page.
    
    **Features:**
    - ✅ Upload Excel files (.xlsx, .xls, .csv)
    - ✅ View data in an interactive table
    - ✅ Export data to CSV
    - ✅ Load sample data for testing
    - ✅ Responsive design
    - ✅ Full TypeScript support
    """)
