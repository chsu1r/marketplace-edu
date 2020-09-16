"""empty message

Revision ID: c4c47b0b3690
Revises: 2e997e321c11
Create Date: 2020-09-15 21:54:15.502402

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4c47b0b3690'
down_revision = '2e997e321c11'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sales',
    sa.Column('sale_id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), server_default='', nullable=True),
    sa.Column('seller_username', sa.String(), nullable=False),
    sa.Column('draft', sa.Boolean(), server_default='f', nullable=True),
    sa.PrimaryKeyConstraint('sale_id')
    )
    op.add_column('sale_items', sa.Column('claimed', sa.ARRAY(sa.String()), server_default='{}', nullable=True))
    op.add_column('sale_items', sa.Column('draft', sa.Boolean(), server_default='f', nullable=True))
    op.add_column('sale_items', sa.Column('sale_id', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('sale_items', 'sale_id')
    op.drop_column('sale_items', 'draft')
    op.drop_column('sale_items', 'claimed')
    op.drop_table('sales')
    # ### end Alembic commands ###